
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
const Stats = () => {
    const axiosPublic =useAxiosPublic()
    const {data: count={}}=useQuery({
        queryKey:['count'],
        queryFn:async()=>{
            const result = await axiosPublic.get('/delivery/count')
            return result.data
        }
    })
    // console.log(count)
    return (
        <div>

            <div className='text-center my-20'>

                <div className="stats shadow max-w-4xl">
                    <CountUp start={0} end={count.parcelCount} delay={5}>
                        {({ countUpRef, start }) => (
                            <div className="stat place-items-center">
                                <div className="stat-title">Parcels Booked</div>
                                <div onPointerOver={start} className="stat-value"><span ref={countUpRef} /> </div>

                            </div>
                        )}
                    </CountUp>
                    <CountUp start={0} end={count.deliveryCount} delay={3}>
                        {({ countUpRef, start }) => (
                            <div className="stat place-items-center">
                                <div className="stat-title">Parcels Delivered</div>
                                <div onPointerOver={start} className="stat-value text-secondary"><span ref={countUpRef}></span></div>

                            </div>
                        )}
                    </CountUp>
                    <CountUp start={0} end={count.userCount} delay={3}>
                        {({ countUpRef, start }) => (
                            <div className="stat place-items-center">
                                <div className="stat-title">Registered Users</div>
                                <div onPointerOver={start} className="stat-value"><span ref={countUpRef}></span></div>
                                
                            </div>
                        )}
                    </CountUp>
                </div>
            </div>

        </div >
    );
};

export default Stats;