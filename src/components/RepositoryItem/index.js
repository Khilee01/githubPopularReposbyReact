import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepo
  return (
    <li className="repoItem">
      <img src={avatarUrl} alt={name} className="avatarImg" />
      <h1>{name}</h1>
      <div className="alignCounts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="alignCounts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="alignCounts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
