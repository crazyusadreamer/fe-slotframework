/***

Translation tool

 example of constructor's parameter:

 {
  'path': 'assets/languages',
  'locales': ['en', 'ru']
}

*/

export class TranslationManager {
  private languages: any
  private dataPath: string
  private locales: string[]
  private currentLocal: string
  private textMap: Map<any, string>
  private isInitialized: boolean
  private DEFAULT_LOCALE = 'en'

  constructor(dataPath: string, locales: string[]) {
    this.dataPath = dataPath
    this.locales = locales
    this.textMap = new Map<any, string>()
    this.languages = []
  }

  private async loadLanguage(path: string, locale: string) {
    return await (await fetch(`${path}/${locale}.json`)).json()
  }

  public async initialize() {
    this.currentLocal = this.DEFAULT_LOCALE
    for (let i = 0 i < this.locales.length i++) {
      const data = await this.loadLanguage(this.dataPath, this.locales[i])
      this.languages[this.locales[i]] = data
    }
    this.isInitialized = true
  }

  public changeLocale(locale: string) {
    if (!this.isInitialized) {
      this.sendError()
      return
    }
    if (this.locales.indexOf(locale) !== -1) {
      this.currentLocal = locale
    }
  }

  public translate(textObject: any, id: string) {
    if (!this.isInitialized) {
      this.sendError()
      return
    }
    textObject.text = this.getTranslation(id)
    this.textMap.set(textObject, id)
  }

  public getTranslation(id: string): string {
    return this.languages[this.currentLocal][id]
  }

  private sendError() {
    throw Error('TranslationManager is not initialized yet!')
  }
}
