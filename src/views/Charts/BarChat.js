import React from 'react';
import { Bar } from 'react-chartjs-2';
import Axios from '../../containers/Axios/CampaginConfig';
class BarChart extends React.Component{
  state = {
    companiesCount : '',
    companyLables : [],
    contactsData : [],
    campaginsData : []
  }

  componentDidMount(){
    let campaignCompanies = [];
    let campaigns = [];
    let contacts = [];
    Axios.get('admin/dashboard').then(res=>{
      // console.log(res);
      res.data.campaignsCountByCompany.map((mapData,i)=>{
        return(campaignCompanies.push(mapData[1]),campaigns.push(mapData[0]));
      });
      res.data.contactsCountbyCompany.map((mapData,i)=>{
        contacts.push(mapData[0]);
      });
      this.setState({
        companyLables : campaignCompanies,
        campaginsData : campaigns,
        contactsData : contacts
      })
    }).catch((e)=>{
      //console.log(e);
    })
  }
     random = () => Math.round(Math.random() * 100)
    data= {
        labels: this.state.companyLables,
        datasets: [
          {
            backgroundColor: 'lightpink',
            label : 'Campaigns',
            borderColor: 'rgba(220, 220, 220, 0.8)',
            highlightFill: 'rgba(220, 220, 220, 0.75)',
            highlightStroke: 'rgba(220, 220, 220, 1)',
            data: this.state.campaginsData
          },
          {
            backgroundColor: 'rgba(151, 187, 205, 0.5)',
            label : 'Contacts',
            borderColor: 'rgba(151, 187, 205, 0.8)',
            highlightFill: 'rgba(151, 187, 205, 0.75)',
            highlightStroke: 'rgba(151, 187, 205, 1)',
            data: this.state.contactsData
          }
        ]
      };
    render(){
        return(
            <>
            <Bar
            data={{
              labels: this.state.companyLables,
              datasets: [
                {
                  backgroundColor: 'lightpink',
                  label : 'Campaigns',
                  borderColor: 'rgba(220, 220, 220, 0.8)',
                  highlightFill: 'rgba(220, 220, 220, 0.75)',
                  highlightStroke: 'rgba(220, 220, 220, 1)',
                  data: this.state.campaginsData
                },
                {
                  backgroundColor: 'rgba(151, 187, 205, 0.5)',
                  label : 'Contacts',
                  borderColor: 'rgba(151, 187, 205, 0.8)',
                  highlightFill: 'rgba(151, 187, 205, 0.75)',
                  highlightStroke: 'rgba(151, 187, 205, 1)',
                  data: this.state.contactsData
                }
              ]
            }}
           />
          </>
        )
    }
}

export default BarChart;