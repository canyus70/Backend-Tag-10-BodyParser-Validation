import { useEffect, useState } from "react";

const ShowMeWhatYouGot = () => {

    const [entry, setEntry] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3000/api/guestbook-entry", { method: "GET" })
          .then((res) => res.json())
          .then(({ success, result, error }) => {
            if (!success) console.log(error); 
            else setEntry(result);
          });
      }, []);

    return ( 
        <article>
            {entry.map((eintrag) => (
            <div key={eintrag.id}>
                <p>{eintrag.firstName} {eintrag.lastName}'s Eintrag:</p>
                <p>{eintrag.message}</p>

            </div>
            ))}
        </article>
     );
}
 
export default ShowMeWhatYouGot;