import { SectionTitle } from '../components/section-title.component';

export const VisionMission = () => {
	return (
		<section className='container vmv-section' id='vision-mission'>
			<div>
				<SectionTitle title='Vision' subTitle='Mission & Values' />
			</div>
			<div className='vmv-grid'>
				<div className='card'>
					<h2>Our Vision</h2>
					<p>
						To redefine the future of digital innovation in Africa by creating technology 
						that empowers people, accelerates progress, and bridges the gap between 
						opportunity and possibility.
					</p>
				</div>
				<div className='card'>
					<h2>Our Mission</h2>
					<p>
						We exist to design and deliver intelligent, human-centered, and 
						cloud-native solutions that make advanced technology accessible, 
						practical, and impactful for individuals, businesses, and communities.
					</p>
				</div>
				<div className='card'>
					<h2>Our Values</h2>
					<ul className='bullets'>
						<li><strong>Innovation</strong> – We dare to imagine, design, and build beyond limits.</li>
						<li><strong>Accessibility</strong> – Technology should empower everyone, not just a few.</li>
						<li><strong>Scalability</strong> – Every solution we craft is built to grow and adapt.</li>
						<li><strong>Impact</strong> – We measure success by the change we inspire and the lives we touch.</li>
					</ul>
				</div>
			</div>
		</section>
	);
};
