import { useState } from "react";
import Guestbook from "../components/Guestbook";
import ShowMeWhatYouGot from "../components/Showmewhatyougot";

const Home = () => {
    const [entry, setEntry] = useState([]);

    return ( 
        <section>
            <Guestbook updateEntryArray={(newEntryArray) => setEntry(newEntryArray)}/>
            <ShowMeWhatYouGot entries={entry}/>
        </section>
     );
}
 
export default Home;