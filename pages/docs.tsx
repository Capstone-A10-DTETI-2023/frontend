const Docs = () => {

    return (
        <>
            <section className="prose max-w-full">
                <h2 className="text-center">
                    🚰 Capstone A-10 (Frontend)
                </h2>

                <h3>🤔 Project Description</h3>
                <p>In this capstone project held by DTETI FT UGM, we, as A-10 team, designed a prototype system to monitor water quality and detect leaks in air distribution pipes with residual vector and sensitivity matrix method. In this system, we also added control mechanism to control the pressure pump with PID controller to achieve desired pressure and stop further waste due to leakage.F</p>
                <a href="https://github.com/Capstone-A10-DTETI-2023">Capstone-A10-DTETI-2023 (Github Orgs)</a>

                <h3>⚙️ Project Features</h3>
                <ul>
                    <li>
                        Water Quality Monitoring
                        <ul>
                            <li>Temperature</li>
                            <li>Turbidity</li>
                        </ul>
                    </li>
                    <li>
                        Leakage Detection
                        <ul>
                            <li>Using residual vector and sensitivity matrix</li>
                            <li>Realtime leakage notification using <a href="https://fonnte.com/">fonnte</a> (via WhatsApp) and <a href="https://pusher.com/">Pusher</a> (via web app)</li>
                        </ul>
                    </li>
                    <li>
                        Pressure Pomp Control
                        <ul>
                            <li>Using PID (Proportional Integral Derivative) Controller</li>
                        </ul>
                    </li>
                    <li>
                        RBAC (Role-based Access Control)
                    </li>
                </ul>

                <h3>📽️ Capstone Project Video</h3>
                <iframe src="https://www.youtube.com/embed/1k3EBfzz-8s" className="w-full h-96" />

                <h3>👨‍🦱👧 Contributor</h3>
                <ul>
                    <li>
                        Angela Nathalie Felicia Putri - 20/460152/TK/50741
                    </li>
                    <li>
                        Mochammad Iqbal Syaifurrahman - 20/463243/TK/51235
                    </li>
                    <li>
                        Stephen Alfredo Butar Butar - 20/463260/TK/51252
                    </li>
                    <li>
                        Yosef Adi Sulistyo - 20/456105/TK/50235
                    </li>
                    <li>
                        Saddan Syah Akbar - 20/460566/TK/51155
                    </li>
                </ul>

                <hr />

                <footer className="text-center">
                    Copyright 2023 - Capstone A10 DTETI FT UGM
                </footer>

            </section>
        </>
    );
}

export default Docs;