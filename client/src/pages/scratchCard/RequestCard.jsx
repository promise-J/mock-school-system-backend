import React from 'react';
import Paystack from 'src/components/payStack/Paystack';
import Layout from '../../components/Layout/Layout';
// import Paystack from '../../components/payStack/Paystack'

const RequestCard = () => {



    return <Layout>
     <div className='purchaseCard'>
       <div className="purchaseCardWrapper">
       <h1 style={{fontWeight: 100, fontSize: 20}}>Buy Scratch Card Now!</h1>
       <Paystack />
       </div>
       </div>;
    </Layout>
};

export default RequestCard;
