import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Axios from '../../containers/Axios/CampaginConfig';

class DoughnutChart extends React.Component{

  state = {
    companiesCount : '',
    contactsCount : '',
    campaignesCount : '',
    data : {}
  }
  componentDidMount(){
    Axios.get('admin/dashboard').then(res=>{
      // console.log(res);
      this.setState({
        data:  {
          labels: ['companies Count', 'Campaignes Count', 'Contacts Count'],
          datasets: [{
            data: [res.data.companiesCount, res.data.campaignesCount, res.data.contactsCount],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        }
      })
    }).catch((e)=>{
      //console.log(e);
    })
  }
    render(){
        return(
            <>
            <Doughnut data={this.state.data}/>
            </>
        )
    }
}

export default DoughnutChart;