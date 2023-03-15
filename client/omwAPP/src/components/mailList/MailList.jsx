const MailList = () => {
    return ( 
        <div class="mail">
            <h1 className="mailTitle">Save time, save money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals for you</span>
            <div class="mailInputContainer">
                <input type="email" placeholder="Your Email"/>
                <button>Subscribe</button>
            </div>
        </div>
     );
}
 
export default MailList;