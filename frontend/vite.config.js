import { execFileSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function getRepositoryName() {
  const repository = process.env.GITHUB_REPOSITORY?.trim()
  if (repository) return repository.split('/').pop()

  try {
    const remote = execFileSync('git', ['config', '--get', 'remote.origin.url'], { encoding: 'utf8' }).trim()
    return remote.replace(/\\/g, '/').replace(/\.git$/, '').split('/').pop() || ''
  } catch {
    return ''
  }
}

const repositoryName = getRepositoryName()

export default defineConfig(({ command }) => ({
  base: command === 'build' && repositoryName ? `/${repositoryName}/` : '/',
  plugins: [react()],
}))
