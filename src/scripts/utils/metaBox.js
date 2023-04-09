/**
 * On load listen for metabox events like submit, clear etc
 */
import { dispatch } from '@wordpress/data';
import { NOTIFY_NAMESPACE } from '../store/constants';
import { __ } from '@wordpress/i18n';

/**
 *  @typedef {import('../store').Notice} Notice
 */

window.addEventListener( 'load', () => {
	/**
	 * Adding an event listener to the form with the id of `wp-notification-metabox-form` that adds a new notification using the form data
	 */
	const wpNotificationMetabox = document.getElementById(
		'wp-notification-metabox-form'
	);

	if ( wpNotificationMetabox ) {
		wpNotificationMetabox.addEventListener( 'submit', ( e ) => {
			e.preventDefault();
			const title =
				/** @type {HTMLInputElement} */ (
					document.getElementById(
						'wp-notification-metabox-form-title'
					)
				).value || __( 'New Notification' );
			const message =
				/** @type {HTMLInputElement} */ (
					document.getElementById(
						'wp-notification-metabox-form-message'
					)
				).value || __( 'Notification default text' );

			dispatch( NOTIFY_NAMESPACE ).addNotice(
				/** @type {Notice} */ ( {
					title,
					message,
					context: 'dashboard',
					dismissible: true,
				} )
			);
		} );
	}

	/**
	 *  Adding an event listener to the form with the id of `wp-notification-metabox-form` that handles "clear all notifications"
	 */
	const wpNotificationClearAll = document.getElementById(
		'clear-all-wp-notify'
	);
	if ( wpNotificationClearAll )
		wpNotificationClearAll.addEventListener( 'click', () => {
			window.wp.notify.clear( 'dashboard' );
		} );
} );
