
import CountUp from 'react-countup';
const Stats = () => {
    return (
        <div>

            <div className='text-center my-20'>

                <div className="stats shadow max-w-4xl">
                    <CountUp start={0} end={100} delay={3}>
                        {({ countUpRef, start }) => (
                            <div className="stat place-items-center">
                                <div className="stat-title">Parcels Booked</div>
                                <div onPointerOver={start} className="stat-value"><span ref={countUpRef} /> </div>

                            </div>
                        )}
                    </CountUp>
                    <CountUp start={0} end={100} delay={3}>
                        {({ countUpRef, start }) => (
                            <div className="stat place-items-center">
                                <div className="stat-title">Parcels Delivered</div>
                                <div onPointerOver={start} className="stat-value text-secondary"><span ref={countUpRef}></span></div>

                            </div>
                        )}
                    </CountUp>
                    <CountUp start={0} end={100} delay={3}>
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