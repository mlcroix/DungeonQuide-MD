import "./campaign-join.scss";

export default function CampaignJoin() {
    return (
        <div className="campaign-join-wrapper">
            <h1>Join a Campaign</h1>
            <div className="campaign-join-text">
                <p>Join an existing campaign and continue the adventure!</p>
            </div>
            <div>
                <form className="campaign-join-form">
                    <input type="text" placeholder="Enter Campaign Code" />
                    <button className="button">Join Campaign</button>
                </form>
            </div>
            <div className="campaign-join-text">
                <p>Don't have a campaign code? Ask your Dungeon Master for one!</p>
            </div>
        </div>
    );
}      
