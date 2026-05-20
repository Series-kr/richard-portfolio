import { Octokit } from "@octokit/rest"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Series-kr"

export async function fetchUserRepos() {
  const { data } = await octokit.repos.listForUser({
    username: GITHUB_USERNAME,
    per_page: 100,
    sort: "updated",
    type: "all",
  })
  return data
}

export async function fetchPinnedRepos() {
  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              databaseId
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage { name }
              repositoryTopics(first: 5) {
                nodes { topic { name } }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })

  const { data } = await response.json()
  return data?.user?.pinnedItems?.nodes ?? []
}
