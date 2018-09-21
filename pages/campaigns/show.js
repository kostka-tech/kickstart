import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address: props.query.address,
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                description: 'The manager created this campaign and can make requests to withdraw money',
                meta: 'Address of Manager',
                style: { overflowWrap: 'break-word' },
            },
            {
                header: minimumContribution,
                description: 'You must contribute at least this much wei to become an approver.',
                meta: 'Minimum Contribution (wei)',
            },
            {
                header: requestsCount,
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
                meta: 'Number of requests',
            },
            {
                header: approversCount,
                description: 'Number of people who have already donated to this campaign.',
                meta: 'Number of Approvers',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                description: 'The balance is how much money this campaign has to spend.',
                meta: 'Campaign Balance (ether)',
            },
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Show Campaign</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            { this.renderCards() }
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={ this.props.address } />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>
                                        View Requests
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;