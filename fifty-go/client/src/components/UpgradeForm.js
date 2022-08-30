import { Link } from 'react-router-dom';

function UpgradeForm() {

    const handleSubmit = (event) => {
        window.confirm("Your Membership has been upgraded! Check out the MapView page to track your pins!");
      }

    return (
        <>
        <div className="container mb-5">
        <div className="section-header mt-5">
          <span>Upgrade Membership</span>
          <h2>Upgrade Membership</h2>
      </div>

             <form onSubmit={handleSubmit}>
         <div className="form-group mt-3">
           <label htmlFor="upgradeUsername">Username:</label>
           <input id="upgradeUsername" name="upgradeUsername" type="text" className="form-control"/>
         </div>
         <div className="form-group mt-3">
           <label htmlFor="upgradePassword">Password:</label>
           <input id="upgradePassword" name="upgradePassword" type="text" className="form-control"/>
         </div>
         <div className="form-group mt-3">
           <label htmlFor="upgradeCC">CC #</label>
           <input id="upgradeCC" name="upgradeCC" type="text" className="form-control"/>
           <small id="CChelp" class="form-text text-muted">We accept Visa, Discover, MasterCard, AmEx</small>
         </div>
         <div className="row">
         <div className="form-group mt-3 col-6">
           <label htmlFor="upgradeCCV">CCV:</label>
           <input id="upgradeCCV" name="upgradeCCV" type="number" className="form-control"/>
         </div>
         <div className="form-group mt-3 col-6">
           <label htmlFor="upgradeExp">Exp Date:</label>
           <input id="upgradeExp" name="upgradeExp" type="text" className="form-control"/>
         </div>
         </div>
         <div className="mt-4">
            <button className="btn btn-primary mr-2" type="submit">
                <i className="bi bi-file-earmark-check"></i> Submit
            </button>
         </div>
       </form>
       </div>
        </>
    )
}

export default UpgradeForm;