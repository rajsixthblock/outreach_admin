import React from 'react';
import { Line } from 'react-chartjs-2';
import Axios from '../../containers/Axios/CampaginConfig';

class LineChart2 extends React.Component {
    state = {
        data: {},
        labeslArray: [],
        dataArray: []
    }
    componentDidMount() {
        let usersLabel = [];
        let usersCount = [];
        Axios.get('admin/dashboard').then(res => {
             //console.log(res);
            res.data.usersCountByCompany.map((mapData,i)=>{
                return(usersLabel.push(mapData[1]),usersCount.push(mapData[0]));
            });
            this.setState({
                labeslArray : usersLabel,
                dataArray : usersCount
            })

        }).catch((e) => {
            //console.log(e);
        })
    }
    render() {
        return (
            <>
                <Line 
                    data={ {
                        labels: this.state.labeslArray,
                        datasets: [{
                            label: 'Users',
                            data: this.state.dataArray,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                    }]
                }} />
            </>
        )
    }
}

export default LineChart2;
