import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  IAutoCompleteDataNormalized,
  IUserPageProps,
} from "./UserPage.interface";

import "./UserPage.css";
import { useContext, useEffect, useRef, useState } from "react";
import {
  depositBalance,
  fetchProfiles,
  getContractsAgainstContractor,
  payForJobAPICall,
} from "../../Api";
import { GlobalContext } from "../../App";
import { IJobWithContract, IProfiles } from "../../Api/interface";
import { CLIENT_TYPE_ENUM } from "../../Api/constants";

const UserPage = (props: IUserPageProps) => {
  const [amountToDeposit, setAmountToDeposit] = useState(0);
  const [contractors, setContractors] = useState<
    IAutoCompleteDataNormalized[] | null
  >(null);
  const [contracts, setContracts] = useState<IJobWithContract[]>([]);

  const selectedContractor = useRef<IAutoCompleteDataNormalized | null>(null);

  const globalContext = useContext(GlobalContext);
  let user = globalContext.loggedInUser;

  useEffect(() => {
    async function fetchProfilesForContractors(type: CLIENT_TYPE_ENUM) {
      const profiles = await fetchProfiles(type);
      if (profiles) {
        const normalizedContractors: IAutoCompleteDataNormalized[] =
          profiles.map((profile) => {
            return {
              ...profile,
              label: `${profile.firstName} ${profile.lastName}`,
            };
          });
        setContractors(normalizedContractors);
      }
    }
    if (!contractors || contractors.length === 0) {
      fetchProfilesForContractors(CLIENT_TYPE_ENUM.contractor);
    }
  }, []);

  const handleDeposit = (amount: number) => {
    let copyAmount = amountToDeposit;
    copyAmount += amount;
    setAmountToDeposit(copyAmount);
  };

  const handleDepositAPICall = async () => {
    const result = await depositBalance(user?.id || 0, amountToDeposit);
    if (result?.newBalance && user) {
      alert(`Deposit success new balance is ${result.newBalance}`);
      user = {
        ...user,
        balance: result.newBalance,
      };
      globalContext.updateLoggednUser(user);
      setAmountToDeposit(0);
    }
  };

  const getPaidAndUnpaidJobs = async () => {
    if (selectedContractor.current && selectedContractor.current.id) {
      const contracts = await getContractsAgainstContractor(
        user?.id || 0,
        selectedContractor.current?.id || 0
      );
      if (contracts) {
        setContracts(contracts);
      }
    }
  };

  const payForJob = async (jobIndex: number) => {
    const contractToPayFor = contracts[jobIndex];
    if (user && user.balance && user.balance < contractToPayFor.price) {
      alert("You have insufficient balance");
    } else {
      const result = await payForJobAPICall(user?.id || 0, contractToPayFor.id);
      if (result) {
        alert(`Successfully paid for job with id: ${contractToPayFor.id}`);
        getPaidAndUnpaidJobs();
      }
    }
  };

  const handleContractorChange = (
    event: any,
    newValue: IAutoCompleteDataNormalized | null
  ) => {
    selectedContractor.current = newValue;
  };

  const renderDenominationBoxes = () => {
    const presetAmounts = [1, 5, 10, 50, 100, 500];
    return (
      <div className="deposit-button-container">
        <Typography variant="h6">Deposit Amounts:</Typography>
        {presetAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outlined"
            color="primary"
            onClick={() => handleDeposit(amount)}
          >
            ${amount}
          </Button>
        ))}
        <Typography variant="h3" sx={{ marginTop: "10px" }}>
          $: {amountToDeposit}
        </Typography>
      </div>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper className="paper-container">
          <Typography variant="h5" component="div" className="heading">
            Top-up Feature
          </Typography>
          {renderDenominationBoxes()}
          <Grid
            container
            flex={"row"}
            justifyContent={"center"}
            alignItems={"baseline"}
          >
            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                marginRight: "20px",
              }}
              onClick={handleDepositAPICall}
              disabled={!amountToDeposit}
            >
              Submit
            </Button>

            <Button
              color="warning"
              sx={{
                marginTop: "20px",
              }}
              onClick={() => setAmountToDeposit(0)}
            >
              Clear
            </Button>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper className="paper-container">
          <Typography variant="h5" component="div" className="heading">
            Pay Contractor: Feature
          </Typography>
          <div>
            <FormControl>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={contractors || []}
                onChange={handleContractorChange}
                key="fullName"
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Pay Jobs For..." />
                )}
              />
              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  marginRight: "20px",
                }}
                onClick={getPaidAndUnpaidJobs}
              >
                Continue
              </Button>

              <div>
                {contracts.length > 0 && (
                  <ul>
                    {contracts.map((contract, index) => (
                      <li key={contract.id}>
                        <>
                          Contract id: {contract.id} with Description:
                          {contract.description}
                          And Status ={" "}
                          <b>{contract.paid ? "PAID" : "UNPAID"}</b>
                          {!contract.paid && (
                            <Button
                              key={contract.id}
                              variant="contained"
                              onClick={() => payForJob(index)}
                            >
                              Pay For Job
                            </Button>
                          )}
                        </>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FormControl>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserPage;
