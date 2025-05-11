import React from 'react';
import i1 from "../../../assets/icons/1.jpg"
import i2 from "../../../assets/icons/2.jpg"
import i3 from "../../../assets/icons/a-checkmark-inside-a-parcel-box-with-a-delivery-si.png"
import { Fade } from 'react-awesome-reveal';

const Features = () => {
    return (
        <div className='flex justify-center '>
            <div>
                <h2 className="text-center text-3xl my-20">Our Features Yours  <span className='font-bold text-green-500'> Safety</span></h2>
            <Fade>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20'>
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <img src={i1} alt="" />
                        <h2 className="card-title">Package Tracking</h2>
                        <p>This feature allows customers to track the real-time location and status of their parcels. By entering a tracking number, users can see where their package is along its journey, whether it’s in transit, out for delivery, or successfully delivered. This feature adds transparency and helps customers stay informed about the status of their orders.</p>

                    </div>
                </div>
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <img src={i2} alt="" />
                        <h2 className="card-title">Shipping Services</h2>
                        <p>Shipping services give customers the flexibility to choose different methods of delivery based on their needs. These could include express services (fast delivery), standard shipping (economical), and international shipping (for cross-border deliveries). This feature ensures that customers can select the best shipping option based on their time constraints and budget.</p>

                    </div>
                </div>
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <img src={i3} alt="" />
                        <h2 className="card-title">Delivery Confirmation</h2>
                        <p>Delivery confirmation provides customers with proof that their parcel has been successfully delivered. This can include receiving an email notification, a delivery receipt, or even a signature from the recipient. It reassures customers that their package has reached its destination safely.</p>
                        <div className="card-actions justify-end">
                            
                        </div>
                    </div>
                </div>
            </div>
            </Fade>
            </div>

        </div>
    );
};

export default Features;