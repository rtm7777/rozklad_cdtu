import dataBase from "./indexedDB";

class I18n {
	constructor() {
		this.userLocale = navigator.language;
		this.translations = {};
	}

	load() {
		return dataBase.loadTranslations(this.userLocale).then((translations) => {
			console.log(translations);
			translations.map(({key, translation}) => {
				this.translations[key] = translation;
			});
		});
	}

	t(key) {
		return this.translations[key];
	}
}

const i18n = new I18n();

export default i18n;
