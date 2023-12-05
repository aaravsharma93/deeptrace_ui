//eslint-disable-next-line
import React, { Fragment } from 'react';
import { PageTitle } from '../../layout-components';
import { Grid, IconButton, Box, Card, Checkbox, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './dashboard.module.css'
import Chart from 'react-apexcharts';
import clsx from 'clsx';


export default function Dashboard() {
    const chart34Options = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            },
            stacked: false,
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {

            bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '50%'
            }
        },
        stroke: {
            show: true,
            width: 0,
            colors: ['transparent']
        },
        colors: ['#f83245', '#1bc943'],
        fill: {
            opacity: 1
        },
        legend: {
            show: false
        },
        labels: ['Jan' , 'Feb', 'March', 'April', 'May' ,'June' ,'July', 'Aug'],
        xaxis: {
            crosshairs: {
                width: 1
            }
        },
        yaxis: {
            min: 0
        }
    }
    const chart34Data = [
        {
            name: 'Net Profit',
            data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1, 3.6, 3.2]
        },
        {
            name: 'Net Loss',
            data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2]
        }
    ]

    return (
        <Fragment>
            <PageTitle
                titleHeading="Dashboard"
                titleDescription="" />
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-shadow-first p-4 mb-4">
                        <div className="d-flex justify-content-between">
                            <div className="flex-grow-1 text-nowrap">
                                <div className="font-size-sm mb-2 text-center">
                                    Order Received Today
                                </div>
                                <div className="font-weight-bold">
                                    <div className="font-size-xxl mb-1 text-center">345</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-shadow-first p-4 mb-4">
                        <div className="d-flex justify-content-between">
                            <div className="flex-grow-1 text-nowrap">
                                <div className="font-size-sm mb-2 text-center">
                                    Order Processed Today
                                </div>
                                <div className="font-weight-bold">
                                    <div className="font-size-xxl mb-1 text-center">240</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-shadow-first p-4 mb-4">
                        <div className="d-flex justify-content-between">
                            <div className="flex-grow-1 text-nowrap">
                                <div className="font-size-sm mb-2 text-center">
                                    Total Pending Orders
                                </div>
                                <div className="font-weight-bold">
                                    <div className="font-size-xxl mb-1 text-center">361</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-shadow-first pt-3 pl-4 pr-4 pb-0">
                        <div className="d-flex justify-content-between">
                            <div className="flex-grow-1 text-nowrap">
                                <div className="font-size-sm mb-2">
                                    Top Sales Product
                                    <ol className="pl-4">
                                        <li>
                                            <div className="d-flex justify-content-between">
                                                <div className="flex-grow-1 text-nowrap">Power Rack</div>
                                                <div className={clsx(styles.card_list_item,'flex-grow-1 text-nowrap')}>590/1000</div>
                                            </div>
                                        </li>
                                        <li><div className="d-flex justify-content-between">
                                            <div className="flex-grow-1 text-nowrap">Grill</div>
                                            <div className={clsx(styles.card_list_item,'flex-grow-1 text-nowrap')}>761/1200</div>
                                        </div></li>
                                        <li><div className="d-flex justify-content-between">
                                            <div className="flex-grow-1 text-nowrap">Bike</div>
                                            <div className={clsx(styles.card_list_item,'flex-grow-1 text-nowrap')}>1263/2000</div>
                                        </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="card-box card-shadow-first p-4 mb-4">
                        <div className="d-flex justify-content-between">
                            <div className="flex-grow-1 text-nowrap">
                                <div className="font-weight-bold font-size-md mb-2">
                                    Top Channels
                                </div>
                                <div className="font-size-md">
                                    <ul style={{ listStyleType: 'none' }} className="pl-2">
                                        <li>ALDI NORD - 189</li>
                                        <li>ALDI SUD - 106</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} lg={6}>
                    <Card className="card-box p-4 mb-4">
                        <div className="table-responsive">
                            <h6>Pending Orders per day</h6>
                            <table className="table table-hover mb-4" style={{ background: 'white' }}>
                                <thead className="">
                                    <tr>
                                        <th scope="col"> <Checkbox value="true" className="p-0 m-0" /></th>
                                        <th scope="col"><span className="pe-7s-settings font-size-xxl p-0 m-0" style={{ verticalAlign: 'middle' }}></span></th>
                                        <th scope="col">Received Date</th>
                                        <th scope="col" colSpan="3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row"> <Checkbox value="true" className="p-0 m-0" /></th>
                                        <td><img src="https://img.icons8.com/material-outlined/24/000000/list.png" alt=""/></td>
                                        <td>20.08.2021</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/yellow-circle-emoji.png" className={styles.customimgicon} alt=""/>&nbsp;290</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/black-circle-emoji.png" className={styles.customimgicon} alt=""/>&nbsp;0</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/black-circle-emoji.png" className={styles.customimgicon} alt=""/>&nbsp;0</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> <Checkbox value="true" className="p-0 m-0" /></th>
                                        <td><img src="https://img.icons8.com/material-outlined/24/000000/list.png" alt=""/></td>
                                        <td>25.08.2021</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/black-circle-emoji.png" className={styles.customimgicon} alt=""/>&nbsp;0</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png" className={styles.customimgicon} alt=""/>&nbsp;149</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/red-circle-emoji.png" className={styles.customimgicon} alt=""/>&nbsp;112</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> <Checkbox value="true" className="p-0 m-0" /></th>
                                        <td><img src="https://img.icons8.com/material-outlined/24/000000/list.png" alt=""/></td>
                                        <td>24.08.2021</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/red-circle-emoji.png" alt="" className={styles.customimgicon} />&nbsp;40</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/black-circle-emoji.png" alt="" className={styles.customimgicon} />&nbsp;0</td>
                                        <td><img src="https://img.icons8.com/emoji/48/000000/black-circle-emoji.png" alt="" className={styles.customimgicon} />&nbsp;0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <Card className="card-box p-4  mb-4">
                        <h6>Processed vs Receieved</h6>
                        <Box className="card-tr-actions">
                            <IconButton color="secondary" className="font-size-xl">
                                <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className="font-size-lg" />
                            </IconButton>
                        </Box>
                        <Grid container spacing={4} className="mt-2">

                            <Grid item xs={12} sm={6} lg={6}>
                                <h6 className="font-weight-bold mb-1 text-black">Users List</h6></Grid>
                            <Grid item xs={12} sm={6} lg={6}><Button size="small" color="primary" variant="outlined" className="text-uppercase font-size-xs float-right">
                                Export
                            </Button>
                            </Grid>
                        </Grid>
                        <div className="py-3">
                            <Chart options={chart34Options} series={chart34Data} type="bar" height={325} />
                        </div>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} className="d-flex justify-content-center">
                                {/* <div className="divider-v divider-v-lg" /> */}
                                <div>
                                    <div className="d-flex align-items-center justify-content-center text-uppercase text-black-50 pb-3">
                                        <span className="badge-circle mr-2 badge badge-danger">total</span>
                                        <span>Gross revenue</span>
                                    </div>
                                    {/* <Circle
                                        animate={true} // Boolean: Animated/Static progress
                                        animationDuration="3s" //String: Length of animation
                                        responsive={false} // Boolean: Make SVG adapt to parent size
                                        size={160} // Number: Defines the size of the circle.
                                        lineWidth={22} // Number: Defines the thickness of the circle's stroke.
                                        progress={34.8} // Number: Update to change the progress and percentage.
                                        progressColor="#1bc943"  // String: Color of "progress" portion of circle.
                                        bgColor="#e8e9ef" // String: Color of "empty" portion of circle.
                                        textColor="#3b3e66" // String: Color of percentage text color.percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                                        roundedStroke={true}
                                        textStyle={{
                                            fontSize: '80px'
                                        }} // Boolean: Rounded/Flat line ends
                                        showPercentage={true} // Boolean: Show/hide percentage.
                                        showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                    /> */}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} className="d-flex justify-content-center">
                                        <div>
                                            <div className="d-flex align-items-center justify-content-center text-uppercase text-black-50 pb-3">
                                                <span className="badge-circle mr-2 badge badge-success">available</span>
                                                <span>Net Revenue</span>
                                            </div>
                                            </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
}
