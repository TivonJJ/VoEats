/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
import { LogBox } from "react-native";

// prettier-ignore
LogBox.ignoreLogs([
    "Require cycle:",
    "Attaching onAction listeners to non root nodes is dangerous",
]);
