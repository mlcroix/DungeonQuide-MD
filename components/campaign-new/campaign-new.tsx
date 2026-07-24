import "./campaign-new.scss";

export default function CampaignNew() {
    return (
        <div className="campaign-new-wrapper">
            <h1>New Campaign</h1>
            <div className="campaign-new-text">
                <p>Create a new campaign for your players. </p>
                <p>Every epic journey starts with a single step. Let the adventure begin!</p>
            </div>
            <div>
                <button className="button">Create Campaign</button>
            </div>
        </div>
    );
}      
