import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./CompanyView.scss";
import { useHistory } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const makeListItemStyles = (styles) => {
  return makeStyles((theme) => ({
    listItemText: styles,
  }));
};

const useStyles = makeStyles({
  root: {
    height: 150,
  },
});

function CustomListItemText(props) {
  const { primary, secondary } = props;
  const primaryClasses = makeListItemStyles({ fontSize: "1.5rem" })();
  const secondaryClasses = makeListItemStyles({ fontSize: "1rem" })();
  return (
    <ListItemText
      primary={primary}
      secondary={secondary}
      classes={{
        primary: primaryClasses.listItemText,
        secondary: secondaryClasses.listItemText,
      }}
    />
  );
}

function SolutionContent(props) {
  const { solutions } = props;
  const { solutionIdx } = useParams();
  const solution = solutions[solutionIdx];
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{solution.name}</h1>
      <List>
        <ListItem>
          <CustomListItemText
            primary="솔루션 개요"
            secondary={solution.introduction}
          />
        </ListItem>
        <ListItem>
          <CustomListItemText
            primary="솔루션 특징"
            secondary={solution.features}
          />
        </ListItem>
        <ListItem>
          <CustomListItemText
            primary="솔루션 구성"
            secondary={solution.structure}
          />
        </ListItem>
      </List>
    </div>
  );
}

export default function CompanyView(props) {
  const { data, logo, solImgs } = props;
  const classes = useStyles();
  const { path } = useRouteMatch();
  const { companyIdx } = useParams();

  const history = useHistory();

  function getLinkHandler(url) {
    return () => {
      if (url[0] === "/") history.push(url);
      else window.open(url);
    };
  }

  return (
    <div>
      <div className="Comp-view-box">
        <Grid container>
          <Grid item xs={8}>
            <h1 className="companyName" style={{ textAlign: "center" }}>
              {data.name}
            </h1>
            <List>
              <ListItem>
                <CustomListItemText primary="대표자" secondary={data.owner} />
              </ListItem>
              <ListItem>
                <CustomListItemText primary="주소" secondary={data.address} />
              </ListItem>
              <ListItem>
                <CustomListItemText
                  primary="사이트"
                  secondary={data.homepage}
                />
              </ListItem>
              <ListItem>
                <CustomListItemText
                  primary="TEL/FAX"
                  secondary={data.contact}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <img
              src={logo}
              alt="회사로고"
              style={{ width: "80%", margin: "2rem" }}
            />
            <div className="solutions-count-wrap">
              <div className="solutions-count">
                <div style={{ fontSize: "2rem" }}>솔루션 개수</div>
                <div style={{ fontSize: "4rem" }}>{data.solutions.length}</div>
              </div>
            </div>
          </Grid>
        </Grid>
        <div className="company-comment" style={{ padding: "2rem" }}>
          {data.comment}
        </div>
      </div>
      <div className="Comp-view-box">
        <Switch>
          <Route
            path={`${path}/:solutionIdx`}
            render={() => <SolutionContent solutions={data.solutions} />}
          />
          <Route
            path={`${path}`}
            render={() => (
              <div>
                <h1 style={{ textAlign: "center", paddingTop: "1.5rem" }}>
                  솔루션 목록
                </h1>
                <div className="solution-cardboard">
                  {data.solutions.map((solution, idx) => (
                    <div className="solution-card">
                      <Card
                        onClick={getLinkHandler(
                          `/solution/${companyIdx}/${idx}`
                        )}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            src={solImgs[idx]}
                            height="160px"
                          />
                          <CardContent>
                            <Typography variant="h5">
                              {solution.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {solution.introduction}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    </div>
  );
}