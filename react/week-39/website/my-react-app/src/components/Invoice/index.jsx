import Cta from "./Cta";
import propTypes from "prop-types";

function Invoice({message}) {
  console.log("inside invoice component:", message)
  return (
    <article className="cta">
      <h3>Har du en fråga eller behöver en offert?</h3>
      <p><strong>Kontakta oss idag!</strong> Inget jobb är för stort eller för litet för oss.</p>
      <ul className="cta--list">
        <li><i className="fa-solid fa-phone-volume"></i> 0123-456789 </li>
        <li><i className="fa-solid fa-envelope"></i> info@elektrikerjansson.se </li>
        <li><i className="fa-solid fa-location-dot"></i> Exempelgatan 1, 123 45 Staden </li>
      </ul>
      <Cta message={message}/>
    </article>
  )
}

Invoice.propTypes = {
  message: propTypes.string.isRequired
}

export default Invoice;