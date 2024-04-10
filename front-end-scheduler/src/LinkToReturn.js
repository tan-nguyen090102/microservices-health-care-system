export default function HandleChooseLink(authorizedCode) {
  switch (authorizedCode) {
    case "P":
      return "http://localhost:3001/patient-home";
    case "A":
      return "http://localhost:3002/admin-home";
    case "H":
      return "http://localhost:3003/physician-home";
    case "L":
      return "http://localhost:3004/lab-home";
    case "C":
      return "http://localhost:3005/pharmacist-home";
    case "B":
      return "http://localhost:3006/billing-home";
    default:
      return "http://localhost:3000/cas-login";
  }
}
