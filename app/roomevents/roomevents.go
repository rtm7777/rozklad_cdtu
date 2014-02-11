package roomevents

import (
	"container/list"
	"time"
)

type Event struct {
	Type      string
	User      string
	Timestamp int
	Data      string
}

type Subscription struct {
	Archive []Event
	New     <-chan Event
}

func (s Subscription) Cancel() {
	unsubscribe <- s.New
	drain(s.New)
}

func newEvent(typ, user, msg string) Event {
	return Event{typ, user, int(time.Now().Unix()), msg}
}

func Subscribe() Subscription {
	resp := make(chan Subscription)
	subscribe <- resp
	return <-resp
}

func Join(user string) {
	publish <- newEvent("join", user, "")
}

func Say(user, message string) {
	publish <- newEvent("message", user, message)
}

func Leave(user string) {
	publish <- newEvent("leave", user, "")
}

var (
	subscribe = make(chan (chan<- Subscription))

	unsubscribe = make(chan (<-chan Event))

	publish = make(chan Event)
)

func roomevents() {
	subscribers := list.New()

	for {
		select {
		case ch := <-subscribe:
			var events []Event

			subscriber := make(chan Event, 1)
			subscribers.PushBack(subscriber)
			ch <- Subscription{events, subscriber}

		case event := <-publish:
			for ch := subscribers.Front(); ch != nil; ch = ch.Next() {
				ch.Value.(chan Event) <- event
			}

		case unsub := <-unsubscribe:
			for ch := subscribers.Front(); ch != nil; ch = ch.Next() {
				if ch.Value.(chan Event) == unsub {
					subscribers.Remove(ch)
					break
				}
			}
		}
	}
}

func init() {
	go roomevents()
}

func drain(ch <-chan Event) {
	for {
		select {
		case _, ok := <-ch:
			if !ok {
				return
			}
		default:
			return
		}
	}
}
