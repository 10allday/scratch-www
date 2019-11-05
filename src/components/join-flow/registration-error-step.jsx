const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const {injectIntl, intlShape} = require('react-intl');

const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

class RegistrationErrorStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSubmit'
        ]);
    }
    handleSubmit (e) {
        // JoinFlowStep includes a <form> that handles a submit action.
        // But here, we're not really submitting, so we need to prevent
        // the form from navigating away from the current page.
        e.preventDefault();
        this.props.onSubmit();
    }
    render () {
        return (
            <JoinFlowStep
                innerClassName="join-flow-inner-error-step"
                nextButton={this.props.canTryAgain ?
                    this.props.intl.formatMessage({id: 'general.tryAgain'}) :
                    this.props.intl.formatMessage({id: 'general.startOver'})
                }
                title={this.props.intl.formatMessage({id: 'general.error'})}
                titleClassName="join-flow-error-title"
                onSubmit={this.handleSubmit}
            >
                <p className="join-flow-instructions">
                    <FormattedMessage id="registration.cantCreateAccount" />
                </p>
                {this.props.errorMsg && (
                    <p className="join-flow-instructions registration-error-msg">
                        {this.props.errorMsg}
                    </p>
                )}
                {this.props.canTryAgain ? (
                    <p className="join-flow-instructions">
                        <FormattedMessage id="registration.tryAgainInstruction" />
                    </p>
                ) : (
                    <p className="join-flow-instructions">
                        <FormattedMessage id="registration.startOverInstruction" />
                    </p>
                )}
            </JoinFlowStep>
        );
    }
}

RegistrationErrorStep.propTypes = {
    canTryAgain: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string,
    intl: intlShape,
    onSubmit: PropTypes.func.isRequired
};

const IntlRegistrationErrorStep = injectIntl(RegistrationErrorStep);

module.exports = IntlRegistrationErrorStep;
