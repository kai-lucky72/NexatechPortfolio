import { SectionTitle } from '../components/section-title.component';

export const AchievementsRoadmap = () => {
	return (
		<section className='container roadmap-section' id='roadmap'>
			<div>
				<SectionTitle title='Roadmap' subTitle='Our Plans' />
			</div>
			<div className='timeline'>
				<div className='timeline-list'>
					<div className='timeline-item'>
						<p className='designation'>Founded</p>
						<p className='place'>NexaTech Rwanda · April 2025</p>
					</div>
				</div>
				<div className='timeline-list'>
					<div className='timeline-item'>
						<p className='designation'>2025 Planned Releases</p>
						<ul className='timeline-description'>
							<li>SHOPPA · Beta release</li>
							<li>AGRI-Chain · MVP launch</li>
							<li>Skill-Link · Marketplace launch</li>
						</ul>
					</div>
				</div>
				<div className='timeline-list'>
					<div className='timeline-item'>
						<p className='designation'>2026 Vision</p>
						<ul className='timeline-description'>
							<li>Knowledge OS · Full development and launch</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};
