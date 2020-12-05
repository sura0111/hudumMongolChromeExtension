declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@/constants/dictionary.json' {
  declare const dictionary: { dict: MonWritten.DictionaryList }
  export default dictionary
}
