import * as core from '@actions/core';
import { getInputs } from './action-inputs';
import { context } from '@actions/github';
import { GithubConnector } from './github-connector';

async function run(): Promise<void> {
  try {
    const inps = getInputs();
    console.log(inps);

    const gh = new GithubConnector();

    gh.checkAction();

    //TODO: Ignore dependabot and other bots
    const payload = JSON.stringify(context, undefined, 2);

    console.log(`The event payload:: ${payload}`);
    console.log('------------------------');

    await gh.updatePrDetails();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
