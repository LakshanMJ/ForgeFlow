'use client';

import ProjectManagerDashboard from "./ProjectManagerDashboard";
import StakeholderDashboard from "./StakeholderDashboard";
import UserDashboard from "./UserDashboard";

export default function DashboardPage() {
	return (
		<div className="dashboard-sections">
			<UserDashboard />
			{/* <ProjectManagerDashboard /> */}
			{/* <StakeholderDashboard /> */}
		</div>
	);
}
