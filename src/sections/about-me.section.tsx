import { SectionTitle } from '../components/section-title.component';

export const AboutMe = () => {
    return (
        <section
            className='about-me container'
            id='about-me'
        >
            <div>
                <SectionTitle
                    title='About'
                    subTitle='US'
                />
            </div>
            <div>
                <div className='intro'>
                    <p style={{ marginTop: '20px' }}>
                        👋 We are <strong>NexaTech Rwanda</strong> — a product-driven startup shaping Africa’s digital future.
                    </p>
                    <p className='about-brief'>At NexaTech Rwanda, we believe technology should not just solve problems but create opportunities. As a young and driven startup, we craft AI-powered, cloud-native solutions tailored to the realities of emerging markets.

With creativity and resilience, we are shaping a future where technology is not exclusive but a driver of progress for all.</p>

                    {/* In-card navigation boxes */}
                    <div className='about-links'>
                        <a className='floating-btn inline variant-yellow no-hover' href='/#why-nexatech'>
                            <div>Why NexaTech</div>
                            <span></span>
                        </a>
                        <a className='floating-btn inline variant-blue no-hover' href='/#vision-mission'>
                            <div>Vision</div>
                            <span></span>
                        </a>
                        <a className='floating-btn inline variant-green no-hover' href='/#roadmap'>
                            <div>Roadmap</div>
                            <span></span>
                        </a>
                        <a className='floating-btn inline variant-purple no-hover' href='/#tech-stack'>
                            <div>Tech Stack</div>
                            <span></span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
