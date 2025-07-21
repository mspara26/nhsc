/**
 * Checks if experimentation is enabled.
 * @returns {boolean} True if experimentation is enabled, false otherwise.
 */
const isExperimentationEnabled = () => document.head.querySelector('[name^="experiment"],[name^="campaign-"],[name^="audience-"],[property^="campaign:"],[property^="audience:"]')
|| [...document.querySelectorAll('.section-metadata div')].some((d) => d.textContent.match(/Experiment|Campaign|Audience/i));
[...document.querySelectorAll('.section-metadata div')].some((d) => d.textContent.match(/Experiment|Campaign|Audience/i));

/**
 * Loads the experimentation module (eager).
 * @param {Document} document The document object.
 * @returns {Promise<void>} A promise that resolves when the experimentation module is loaded.
 */
export async function runExperimentation(document, config) {
  if (!isExperimentationEnabled()) {
    return null;
  }

  try {
    const { loadEager } = await import(
    // eslint-disable-next-line import/no-relative-packages
      '../plugins/experimentation/src/index.js'
    );
    return loadEager(document, config);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load experimentation module (eager):', error);
    return null;
  }
}

/**
 * Loads the experimentation module (lazy).
 * @param {Document} document The document object.
 * @returns {Promise<void>} A promise that resolves when the experimentation module is loaded.
 */
export async function showExperimentationRail(document, config) {
  if (!isExperimentationEnabled()) {
    return null;
  }

  try {
    const { loadLazy } = await import(
    // eslint-disable-next-line import/no-relative-packages
      '../plugins/experimentation/src/index.js'
    );
    await loadLazy(document, config);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load experimentation module (lazy):', error);
    return null;
  }
}
