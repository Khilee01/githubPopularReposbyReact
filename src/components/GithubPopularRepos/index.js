import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: 'ALL',
    activeReposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getActiveLanguageReposList()
  }

  getActiveLanguageReposList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {activeLanguageId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(url)
    const dataList = await response.json()

    const activeReposList = dataList.popular_repos.map(eachRepos => ({
      name: eachRepos.name,
      id: eachRepos.id,
      issuesCount: eachRepos.issues_count,
      forksCount: eachRepos.forks_count,
      starsCount: eachRepos.stars_count,
      avatarUrl: eachRepos.avatar_url,
    }))
    if (response.ok === true) {
      this.setState({activeReposList, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setActiveLanguageId = async languageId => {
    this.setState(
      {activeLanguageId: languageId},
      this.getActiveLanguageReposList,
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositoryListSuccessView = () => {
    const {activeReposList} = this.state
    return (
      <ul className="repositoryList">
        {activeReposList.map(eachRepo => (
          <RepositoryItem eachRepo={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderRepositoryListSuccessView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="githubPopularReposPage">
        <h1 className="githubPopularReposPageHg">Popular</h1>
        <ul className="languageList">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              eachLanguage={eachLanguage}
              key={eachLanguage.id}
              activeLanguageId={activeLanguageId}
              setActiveLanguageId={this.setActiveLanguageId}
            />
          ))}
        </ul>
        {this.renderComponent()}
      </div>
    )
  }
}

export default GithubPopularRepos
