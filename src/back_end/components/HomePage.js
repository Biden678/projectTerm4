import React from 'react';
import ProductChart from './components_mini/ProductChart';
import RevenueSummary from './components_mini/RevenueSummary';
import CustomerSummary from './components_mini/CustomerSummary';
import UsersThisMonth from './components_mini/UsersThisMonth';
import SumProductSold from './components_mini/SumProductSold';
import ProductSummaryYear from './components_mini/ProductSummaryYear';

function HomePage(props) {
    return (
        <div>

            <ProductSummaryYear/>
            {/* <!--  Row 1 --> */}
            <div class="row">
                
                <div class="col-lg-8 d-flex align-items-strech">
                    <div class="card w-100">
                        <div class="card-body">
                            <ProductChart/>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-12">
                            {/* <!-- Yearly Breakup --> */}
                            <div class="card overflow-hidden">
                                <div class="card-body p-4">
                                    <RevenueSummary/>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            {/* <!-- Monthly Earnings --> */}
    
                            <div class="card">
                                <div class="card-body">
                                    <UsersThisMonth/>
                                </div>
                                <div id="earning"></div>
                            </div>
                        </div>
                        {/* <div class="col-lg-12">
                            <div class="card overflow-hidden">
                                <div class="card-body p-4">
                                    <SumProductSold/>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            
            
    
        </div>
    );
}

export default HomePage;