ability_chain {

  roles {
    owner: "Repository Owner"
    maintainer: "Core Maintainer"
    contributor: "Pull Request Contributor"
    extension: "External Project Builder"
  }

  workflows {
    ci: "Runs tests, lint, build"
    fork_safe: "Ensures forks always pass"
    pr_contract: "Smart contract validation"
    deploy: "Deploys extension projects"
  }

  rules {

    fork_detect {
      if event.repo.isFork == true {
        workflow.fork_safe.required = true
        workflow.pr_contract.required = true
        workflow.deploy.disabled = true
      }
    }

    pr_validation {
      if event.type == "pull_request" {
        require workflow.ci.status == "success"
        require workflow.fork_safe.status == "success"
      }
    }

    extension_ready {
      if event.repo.hasExtension == true {
        workflow.deploy.required = true
      }
    }

    original_improvement {
      if event.repo.isOriginal == true {
        workflow.pr_contract.required = true
      }
    }
  }

  messages {
    fork_success: "Fork validated. You may now build your own project."
    pr_ready: "All workflows green. You may now open a Pull Request."
    extension_ready: "Extension ready. Your project is successfully deployed."
    original_ready: "All checks passed. You may now improve the original repository."
  }
}
