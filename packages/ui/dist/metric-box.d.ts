/**
 * @param  {any} options:
 * - metric: Metric to show
 *   - title
 *   - description (optional)
 *   - infoUrl (optional)
 *   - errorRange (optional)
 *   - warningRange (optional)
 * - value: Value of the metric
 */
declare function MetricBox(options: any): string;
export default MetricBox;
