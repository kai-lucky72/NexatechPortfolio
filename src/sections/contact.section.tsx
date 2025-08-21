import { SectionTitle } from '../components/section-title.component';

export const ContactSection = () => {
    return (
        <section className='container contact-section' id='contact'>
            <div>
                <SectionTitle title='Contact' subTitle='Join Us' />
            </div>
            <div className='contact-phone'>
                <p>
                    Prefer calling? Reach us at{' '}
                    <span className='phone-number'>+250 723374650</span>
                </p>
                <div className='support-actions'>
                    <a
                        href='https://wa.me/250723374650'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='member-more whatsapp'
                        aria-label='Chat on WhatsApp'
                    >
                        Chat on WhatsApp
                    </a>
                </div>
            </div>
            <form
                className='contact-form'
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const data = new FormData(form);
                    const name = String(data.get('name') || '').trim();
                    const email = String(data.get('email') || '').trim();
                    const message = String(data.get('message') || '').trim();
                    const subject = `Message from ${name || 'NexaTech Website'}`;
                    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
                    const mailto = `mailto:nexatech317@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.location.href = mailto;
                }}
            >
                <input type='text' name='name' placeholder='Your Name' required />
                <input type='email' name='email' placeholder='Your Email' required />
                <textarea name='message' placeholder='Your Message' rows={4} required />
                <button type='submit' className='member-more'>Send Message</button>
            </form>
            <div className='contact-cta'>
                <p className='cta-heading'>We’re building for Rwanda and Africa — products that solve real problems and unlock opportunity.</p>
                <p className='cta-copy'>If our mission inspires you, we invite you to stand with us. We design, build, launch, and maintain products like SHOPPA, AGRI‑Chain, and Skill‑Link — and we’re seeking supporters, investors, and partners who believe in accessible, high‑impact technology. Your support helps us research the market, brand our products, and scale to reach millions.</p>
                <div className='support-actions'>
                    <a
                        href={'mailto:nexatech317@gmail.com?subject=Support%20for%20NexaTech%20Rwanda&body=Hello%20NexaTech%20team%2C%0D%0A%0D%0AI%20would%20like%20to%20support%20your%20mission.%20Please%20share%20how%20I%20can%20contribute.'}
                        className='member-more'
                    >
                        Support NexaTech
                    </a>
                    <a
                        href={'mailto:nexatech317@gmail.com?subject=Partnership%20with%20NexaTech%20Rwanda&body=Hello%20NexaTech%20team%2C%0D%0A%0D%0AI%27m%20interested%20in%20a%20partnership%20with%20NexaTech.%20Please%20provide%20next%20steps.'}
                        className='member-more outline'
                    >
                        Partner With NexaTech
                    </a>
                    <a
                        href={'mailto:nexatech317@gmail.com?subject=Membership%20Application%20-%20NexaTech%20Rwanda&body=Hello%20NexaTech%20team%2C%0D%0A%0D%0AI%20would%20like%20to%20become%20a%20member%20of%20NexaTech.%20Please%20share%20the%20requirements%20and%20process.'}
                        className='member-more outline'
                    >
                        Become a Member
                    </a>
                </div>
            </div>
        </section>
    );
};
