import { SectionTitle } from '../components/section-title.component';
import { GlowBox } from '../components/glow-box';

export const WhyNexaTech = () => {
	return (
		<section className='container why-section' id='why-nexatech'>
			<div>
				<SectionTitle title='Why' subTitle='NexaTech' />
			</div>
			<div>
				<p className='intro'>
				At NexaTech Rwanda, we believe innovation should be affordable, fast, and made for everyone. 
    Today's digital tools are often expensive and out of reach for most businesses in Africa. 
    That’s why we design intelligent, cloud-native systems that cut costs 💸, deliver speed ⚡, 
    and are built with Africa’s unique challenges in mind 🌍.  
    We’re not just building products — we’re creating accessible technology that empowers people, 
    drives growth, and ensures no one is left behind in the digital revolution.
				</p>
				<div className='tech-row'>
					<GlowBox color='rgba(255, 99, 71, 0.6)' icon={<span style={{ color: '#fff' }}>💸</span>} title='Lower Cost' />
					<GlowBox color='rgba(0,237,100,0.6)' icon={<span style={{ color: '#fff' }}>⚡</span>} title='Fast + Cloud Native' />
					<GlowBox color='rgba(31,195,255,0.6)' icon={<span style={{ color: '#fff' }}>🌍</span>} title='Built for Africa' />
				</div>
			</div>
		</section>
	);
};
