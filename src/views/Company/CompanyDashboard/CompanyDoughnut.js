import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Axios from '../../../containers/Axios/CampaginConfig';

class CompanyDoughnutChart extends React.Component {
  state = {
    data: {}
  };
  componentDidMount() {
    let companyId = localStorage.getItem('companyId');
    Axios.get('admin/company/dashboard/' + companyId).then(res => {
      // console.log(res);
      this.setState({
        data: {
          labels: ['Contacts Count', 'Campaignes Count'],
          datasets: [{
            data: [res.data.allAudience, res.data.campaignesCount],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        }
      })
    }).catch((e) => {
      //console.log(e);
    })
  };
  render() {
    return (
      <>
        <Doughnut data={this.state.data} />
      </>
    )
  }
}
export default CompanyDoughnutChart;