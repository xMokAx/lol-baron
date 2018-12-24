import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ReferenceLine,
  Legend,
  Label
} from "recharts";

import { getSelectedRoleData } from "../../selectors/ggSelectors";
import { ggRoles } from "../../constants/ggConstants";
import TitleMain from "./TitleMain";

const ChampCharts = ({ roleData, champName }) => {
  let { role, winRate, winsByMatchLength, winsByMatchesPlayed } = roleData;

  role = ggRoles[role];
  winRate = (winRate * 100).toFixed(2);

  const {
    zeroToFifteen,
    fifteenToTwenty,
    twentyToTwentyFive,
    twentyFiveToThirty,
    thirtyToThirtyFive,
    thirtyFiveToForty,
    fortyPlus
  } = winsByMatchLength;

  let winsByMatchLengthData = [];
  const name = `${champName} Win Rate`;
  if (zeroToFifteen.winRate) {
    winsByMatchLengthData = [
      {
        matchLength: "0-15",
        [name]: (zeroToFifteen.winRate * 100).toFixed(2)
      }
    ];
  }

  if (fifteenToTwenty.winRate) {
    winsByMatchLengthData = winsByMatchLengthData.concat([
      {
        matchLength: "15-20",
        [name]: (fifteenToTwenty.winRate * 100).toFixed(2)
      }
    ]);
  }

  winsByMatchLengthData = winsByMatchLengthData.concat([
    {
      matchLength: "20-25",
      [name]: (twentyToTwentyFive.winRate * 100).toFixed(2)
    },
    {
      matchLength: "25-30",
      [name]: (twentyFiveToThirty.winRate * 100).toFixed(2)
    },
    {
      matchLength: "30-35",
      [name]: (thirtyToThirtyFive.winRate * 100).toFixed(2)
    },
    {
      matchLength: "35-40",
      [name]: (thirtyFiveToForty.winRate * 100).toFixed(2)
    },
    {
      matchLength: "40+",
      [name]: (fortyPlus.winRate * 100).toFixed(2)
    }
  ]);

  const {
    oneToFifty,
    fiftyOneToHundred,
    hundredOneToHundredFifty,
    hundredFiftyOneToTwoHundred,
    twoHundredOnePlus
  } = winsByMatchesPlayed;
  const winsByMatchesPlayedData = [
    {
      matchesPlayed: "1-50",
      [name]: (oneToFifty.winRate * 100).toFixed(2)
    },
    {
      matchesPlayed: "51-100",
      [name]: (fiftyOneToHundred.winRate * 100).toFixed(2)
    },
    {
      matchesPlayed: "101-150",
      [name]: (hundredOneToHundredFifty.winRate * 100).toFixed(2)
    },
    {
      matchesPlayed: "151-200",
      [name]: (hundredFiftyOneToTwoHundred.winRate * 100).toFixed(2)
    },
    {
      matchesPlayed: "201+",
      [name]: (twoHundredOnePlus.winRate * 100).toFixed(2)
    }
  ];

  return (
    <React.Fragment>
      <div className="column is-12-mobile is-6-tablet is-6-desktop has-border-right">
        <TitleMain title="Win Rate % by Game Length" />
        <ResponsiveContainer height={200} className="mgt-1">
          <AreaChart
            className="is-size-6-7 is-size-7-mobile is-capitalized"
            data={winsByMatchLengthData}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
          >
            >
            <defs>
              <linearGradient id="champColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d1b2" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#00d1b2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="matchLength"
              stroke="#7a7a7a"
              tick={{ fill: "whitesmoke" }}
              minTickGap={1}
            />
            <YAxis
              width={30}
              tick={{ fill: "whitesmoke" }}
              stroke="#7a7a7a"
              domain={[
                dataMin => {
                  const min = Math.round(dataMin - 1);
                  if (min < 50) {
                    return min;
                  } else {
                    return 49;
                  }
                },
                "auto"
              ]}
              unit="%"
              minTickGap={1}
              interval={0}
              allowDecimals={false}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
            <Area
              dot={true}
              unit="%"
              type="monotone"
              dataKey={name}
              stroke="#00d1b2"
              fillOpacity={1}
              fill="url(#champColor)"
            />
            <ReferenceLine y={50} stroke="whitesmoke">
              <Label fill="whitesmoke" value="50" position="top">
                {`average of ${role} champs: 50%`}
              </Label>
            </ReferenceLine>
            <Legend
              margin={{ top: 0, right: 0, left: 30, bottom: 0 }}
              iconSize={18}
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="column is-12-mobile is-6-tablet is-6-desktop has-border-right">
        <TitleMain title="Win Rate % by Games Played" />
        <ResponsiveContainer height={200}>
          <AreaChart
            className="is-size-6-7 is-size-7-mobile is-capitalized"
            data={winsByMatchesPlayedData}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
          >
            >
            <defs>
              <linearGradient id="champColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d1b2" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#00d1b2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="matchesPlayed"
              stroke="#7a7a7a"
              tick={{ fill: "whitesmoke" }}
              minTickGap={1}
              interval={0}
            />
            <YAxis
              width={30}
              tick={{ fill: "whitesmoke" }}
              stroke="#7a7a7a"
              domain={[
                dataMin => {
                  if (dataMin < winRate) {
                    return dataMin;
                  } else {
                    return winRate - 1;
                  }
                },
                "auto"
              ]}
              unit="%"
              minTickGap={1}
              interval={0}
              allowDecimals={false}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
            <Area
              dot={true}
              unit="%"
              type="monotone"
              dataKey={name}
              stroke="#00d1b2"
              fillOpacity={1}
              fill="url(#champColor)"
            />
            <ReferenceLine y={winRate} stroke="whitesmoke">
              <Label fill="whitesmoke" value="50" position="top">
                {`${champName} (${role}) Win Rate Average: ${winRate}%`}
              </Label>
            </ReferenceLine>
            <Legend
              margin={{ top: 0, right: 0, left: 30, bottom: 0 }}
              iconSize={18}
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

ChampCharts.propTypes = {
  roleData: PropTypes.object.isRequired,
  champName: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const roleData = getSelectedRoleData(state);
  return {
    roleData
  };
};

export default connect(mapStateToProps)(ChampCharts);
