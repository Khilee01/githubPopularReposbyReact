import './index.css'

const LanguageFilterItem = props => {
  const {activeLanguageId, eachLanguage, setActiveLanguageId} = props
  const {language, id} = eachLanguage
  const onClickSetLanguage = () => {
    setActiveLanguageId(id)
  }
  if (activeLanguageId === id) {
    return (
      <button className="activeTab" type="button" onClick={onClickSetLanguage}>
        {language}
      </button>
    )
  }
  return (
    <button onClick={onClickSetLanguage} type="button">
      {language}
    </button>
  )
}
export default LanguageFilterItem
