import React, {useState} from "react";
import backblazeIcon from "./images/backblaze.png"
import bunnyIcon from "./images/bunny.png"
import scalewayIcon from "./images/scaleway.svg"
import vulrtIcon from "./images/vultr.svg"
import './App.sass';

function Calculator() {
  const [storage, setStorage] = useState(0);
  const [transfer, setTransfer] = useState(0);

  const [backblazeStorageCost, setBackblazeStorageCost] = useState(0);
  const [backblazeTransferCost, setBackblazeTransferCost] = useState(0);

  const [bunnyStorageCost, setBunnyStorageCost] = useState(0);
  const [bunnyTransferCost, setBunnyTransferCost] = useState(0);

  const [scalewayStorageCost, setScalewayStorageCost] = useState(0);
  const [scalewayTransferCost, setScalewayTransferCost] = useState(0);

  const [vultrStorageCost, setVultrStorageCost] = useState(0);
  const [vultrTransferCost, setVultrTransferCost] = useState(0);

  const [bunnyOption, setBunnyOption] = useState("HDD");
  const [scalewayOption, setScalewayOption] = useState("Multi");

  const handleStorageChange = (e) => {
    setStorage(e.target.value);
    setBackblazeStorageCost(Math.max(0.005 * e.target.value));
    setBunnyStorageCost(
      bunnyOption === "HDD" ? Math.max(0.01 * e.target.value) : Math.max(0.02 * e.target.value)
    );
    setScalewayStorageCost(e.target.value <= 75 ? 0 : 0.06 * (e.target.value - 75));
    setVultrStorageCost(Math.max(0.01 * e.target.value));
  };

  const handleTransferChange = (e) => {
    setTransfer(e.target.value);
    setBackblazeTransferCost(0.01 * e.target.value);
    setBunnyTransferCost(0.01 * e.target.value);
    setScalewayTransferCost(e.target.value <= 75 ? 0 : 0.02 * (e.target.value - 75));
    setVultrTransferCost(0.01 * e.target.value);
  };

  const handleBunnyOptionChange = (e) => {
    setBunnyOption(e.target.value);
    setBunnyStorageCost(
      e.target.value === "HDD" ? Math.max(0.01 * storage) : Math.max(0.02 * storage)
    );
  };

  const handleScalewayOptionChange = (e) => {
    setScalewayOption(e.target.value);
    setScalewayStorageCost(
      e.target.value === "Multi" ? (storage <= 75 ? 0 : 0.06 * (storage - 75)) : (storage <= 75 ? 0 : 0.03 * (storage - 75))
    );
  };

  const totalBackblazeCost = backblazeStorageCost + backblazeTransferCost > 7 ? backblazeStorageCost + backblazeTransferCost : 7;
  const totalBunnyCost = bunnyStorageCost + bunnyTransferCost > 10 ? 10 : bunnyStorageCost + bunnyTransferCost;
  const totalScalewayCost = scalewayStorageCost + scalewayTransferCost;
  const totalVultrCost = vultrStorageCost + vultrTransferCost > 5 ? vultrStorageCost + vultrTransferCost : 5;

  const maxCost = Math.max(totalBackblazeCost, totalBunnyCost, totalScalewayCost, totalVultrCost);

  const backblazeCostPercent = (totalBackblazeCost / maxCost) * 100;
  const bunnyCostPercent = (totalBunnyCost / maxCost) * 100;
  const scalewayCostPercent = (totalScalewayCost / maxCost) * 100;
  const vultrCostPercent = (totalVultrCost / maxCost) * 100;


  const lowestCost = Math.min(totalBackblazeCost, totalBunnyCost, totalScalewayCost, totalVultrCost);
  const backblazeLowest = totalBackblazeCost === lowestCost;
  const bunnyLowest = totalBunnyCost === lowestCost;
  const scalewayLowest = totalScalewayCost === lowestCost;
  const vultrLowest = totalVultrCost === lowestCost;

  return (
    <div className="calculator">
      <div className="calculator-sliders">
        <div className="calculator-slider">
          <label>Storage: {` ${storage} GB`}</label>
          <input id="storage" type="range" min={0} max={1000} step={1} value={
            storage} onChange={handleStorageChange}/>
          <div className="numbers"><span>0</span><span>1000</span></div>
        </div>
        <div className="calculator-slider">
          <label>Transfer:{` ${transfer} GB`}</label>
          <input type="range" min={0} max={1000} step={1} value={transfer} onChange={handleTransferChange}/>
          <div className="numbers"><span>0</span><span>1000</span></div>
        </div>
      </div>

      <div className="calculator-bars-container">
        <div className="calculator-bar-names">
          <div className="calculator-bar-name-content">
              <span>
                Backblaze:
              </span>
            <img src={backblazeIcon} alt="backblaze icon"/>
          </div>

          <div className="calculator-bar-name-content">
            <div className="calculator-bar-name-with-radio">
                <span>
                  Bunny:
                </span>
              <div className="calculator-radio-buttons">
                <div>
                  <input type="radio" id="bunnyOptionHDD" name="bunnyOption" value="HDD"
                         checked={bunnyOption === 'HDD'}
                         onChange={handleBunnyOptionChange}/>
                  <label htmlFor="bunnyOptionHDD">HDD</label>
                </div>
                <div>
                  <input type="radio" id="bunnyOptionSSD" name="bunnyOption" value="SSD"
                         checked={bunnyOption === 'SSD'}
                         onChange={handleBunnyOptionChange}/>
                  <label htmlFor="bunnyOptionSSD">SSD</label>
                </div>
              </div>
            </div>
            <img src={bunnyIcon} alt="bunny icon"/>
          </div>

          <div className="calculator-bar-name-content">
            <div className="calculator-bar-name-with-radio">
                <span>
                  Scaleway:
                </span>
              <div className="calculator-radio-buttons">
                <div>
                  <input type="radio" id="scalewayOptionMulti" name="scalewayOption" value="Multi"
                         checked={scalewayOption === 'Multi'} onChange={handleScalewayOptionChange}/>
                  <label htmlFor="scalewayOptionMulti">Multi</label>
                </div>
                <div>
                  <input type="radio" id="scalewayOptionSingle" name="scalewayOption" value="Single"
                         checked={scalewayOption === 'Single'} onChange={handleScalewayOptionChange}/>
                  <label htmlFor="scalewayOptionSingle">Single</label>
                </div>
              </div>
            </div>
            <img src={scalewayIcon} alt="scaleway icon"/>
          </div>

          <div className="calculator-bar-name-content">
            <span>
              Vultr:
            </span>
            <img src={vulrtIcon} alt="vulrt icon"/>
          </div>
        </div>

        <div className="calculator-bars">
          <div className="calculator-bar-item">
            <div className={`calculator-bar ${backblazeLowest ? "backblaze-lowest" : ""}`}
                 style={{width: `${backblazeCostPercent}%`}}/>
            {totalBackblazeCost.toFixed(2)}$
          </div>

          <div className="calculator-bar-item">
            <div className={`calculator-bar ${bunnyLowest ? "bunny-lowest" : ""}`}
                 style={{width: `${bunnyCostPercent}%`}}/>
            {totalBunnyCost.toFixed(2)}$
          </div>

          <div className="calculator-bar-item">
            <div className={`calculator-bar ${scalewayLowest ? "scaleway-lowest" : ""}`}
                 style={{width: `${scalewayCostPercent}%`}}/>
            {totalScalewayCost.toFixed(2)}$
          </div>

          <div className="calculator-bar-item">
            <div className={`calculator-bar ${vultrLowest ? "vultr-lowest" : ""}`}
                 style={{width: `${vultrCostPercent}%`}}/>
            {totalVultrCost.toFixed(2)}$
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
