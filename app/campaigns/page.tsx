import CampaignNew from "@/components/campaign-new";

export default function Campaigns() {
  return (
    <div>
        <div className="campaigns-wrapper">
            campaigns
        </div>
        <div className="new-campaign-wrapper">
          <CampaignNew />
            <div className="join-campaign-wrapper">
                <h2>Join Existing Campaign</h2>
            </div>
        </div>
    </div>
  );
}