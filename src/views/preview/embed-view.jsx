// embed view

const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const injectIntl = require('react-intl').injectIntl;

const ProjectViewHOC = require('./project-view-hoc.jsx');
const ErrorBoundary = require('../../components/errorboundary/errorboundary.jsx');
const projectShape = require('./projectshape.jsx').projectShape;
const NotAvailable = require('../../components/not-available/not-available.jsx');
const Meta = require('./meta.jsx');

const GUI = require('scratch-gui');
const IntlGUI = injectIntl(GUI.default);

const Sentry = require('@sentry/browser');
if (`${process.env.SENTRY_DSN}` !== '') {
    Sentry.init({
        dsn: `${process.env.SENTRY_DSN}`,
        // Do not collect global onerror, only collect specifically from React error boundaries.
        // TryCatch plugin also includes errors from setTimeouts (i.e. the VM)
        integrations: integrations => integrations.filter(i =>
            !(i.name === 'GlobalHandlers' || i.name === 'TryCatch'))
    });
    window.Sentry = Sentry; // Allow GUI access to Sentry via window
}

class EmbedView extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        ]);
        const pathname = window.location.pathname.toLowerCase();
        const parts = pathname.split('/').filter(Boolean);
        this.state = {
            extensions: [],
            invalidProject: parts.length === 1,
            projectId: parts[1]
        };
    }
    componentDidMount () {
        this.props.getProjectInfo(this.state.projectId);
        this.props.fetchProjectData(this.state.projectId);
    }
    render () {
        if (this.props.projectNotAvailable || this.state.invalidProject) {
            return (
                <ErrorBoundary>
                    <div className="preview">
                        <NotAvailable />
                    </div>
                </ErrorBoundary>
            );
        }

        return (
            <React.Fragment>
                <Meta projectInfo={this.props.projectInfo} />
                <React.Fragment>
                    <IntlGUI
                        assetHost={this.props.assetHost}
                        basePath="/"
                        className="gui"
                        projectHost={this.props.projectHost}
                        projectId={this.state.projectId}
                        projectTitle={this.props.projectInfo.title}
                    />
                </React.Fragment>
            </React.Fragment>
        );
    }
}

EmbedView.propTypes = {
    assetHost: PropTypes.string.isRequired,
    fetchProjectData: PropTypes.func.isRequired,
    getProjectInfo: PropTypes.func.isRequired,
    projectHost: PropTypes.string.isRequired,
    projectInfo: projectShape,
    projectNotAvailable: PropTypes.bool
};

module.exports.View = ProjectViewHOC(EmbedView);

GUI.setAppElement(document.getElementById('app'));
module.exports.initGuiState = GUI.initEmbedded;
module.exports.guiReducers = GUI.guiReducers;
module.exports.guiInitialState = GUI.guiInitialState;
module.exports.guiMiddleware = GUI.guiMiddleware;
module.exports.initLocale = GUI.initLocale;
module.exports.localesInitialState = GUI.localesInitialState;
