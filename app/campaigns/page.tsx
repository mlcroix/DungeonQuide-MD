import CampaignJoin from "@/components/campaign-join";
import CampaignNew from "@/components/campaign-new";
import "./campaigns.scss";

export default function Campaigns() {
  return (
    <div>
        <h1>Campaigns</h1>
        <div className="campaigns-content-wrapper">
            <div className="campaigns-container">
                campaigns
            </div>
            <div className="campaigns-options-wrapper">
                <CampaignNew />
                <CampaignJoin />
            </div>
        </div>
    </div>
  );
}