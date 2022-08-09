import React from 'react';
import { Polar } from 'react-chartjs-2';
import Axios from '../../containers/Axios/CampaginConfig';

class LineChart extends React.Component {
    state = {
        data: {},
        labeslArray: [],
        dataArray: []
    }
    componentDidMount() {
        Axios.get('admin/dashboard').then(res => {
            // console.log(res);
            this.setState({
                data: {
                    labels: ["Companies Count", "Companies Count By Plan", "Contacts Count", "Campaignes Count"],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [res.data.companiesCount, res.data.companiesCountByPlan, res.data.contactsCount, res.data.campaignesCount],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)',
                            'rgb(201, 203, 207)',
                            'rgb(54, 162, 235)'
                        ]
                    }]
                }
            })
        }).catch((e) => {
          //  console.log(e);
        })
    }
    render() {
        return (
            <>
                <Polar data={this.state.data} />
            </>
        )
    }
}

export default LineChart;
