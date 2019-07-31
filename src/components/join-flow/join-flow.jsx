const bindAll = require('lodash.bindall');
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;

const Progression = require('../progression/progression.jsx');
const UsernameStep = require('./username-step.jsx');
const BirthDateStep = require('./birthdate-step.jsx');
const EmailStep = require('./email-step.jsx');
const WelcomeStep = require('./welcome-step.jsx');

/*
eslint-disable react/prefer-stateless-function, react/no-unused-prop-types, no-useless-constructor
*/
class JoinFlow extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAdvanceStep'
        ]);
        this.state = {
            formData: {},
            registrationError: null,
            step: 0
        };
    }
    handleAdvanceStep (formData) {
        formData = formData || {};
        this.setState({
            step: this.state.step + 1,
            formData: defaults({}, formData, this.state.formData)
        });
    }
    render () {
        return (
            <React.Fragment>
                <Progression step={this.state.step}>
                    <UsernameStep onNextStep={this.handleAdvanceStep} />
                    <BirthDateStep onNextStep={this.handleAdvanceStep} />
                    <EmailStep onNextStep={this.handleAdvanceStep} />
                    <WelcomeStep
                        username={this.state.formData.username}
                        onNextStep={this.handleAdvanceStep}
                    />
                </Progression>
            </React.Fragment>
        );
    }
}

JoinFlow.propTypes = {
    intl: intlShape,
    onCompleteRegistration: PropTypes.func
};

module.exports = injectIntl(JoinFlow);

/*
eslint-enable
*/
