<?php
/**
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

namespace VanillaTests\Library\Vanilla\Database;

use PHPUnit\Framework\TestCase;
use Vanilla\Database\Operation;
use Vanilla\Database\Operation\JsonFieldProcessor;
use VanillaTests\Fixtures\BasicPipelineModel;

/**
 * Class for testing automatically packing and unpacking a JSON field.
 */
class JsonFieldProcessorTest extends TestCase {

    /**
     * Generate data for testing unpacking JSON fields for read operations.
     *
     * @return array
     */
    public function provideReadOperations() {
        $expected = [
            "foo" => "bar",
            "bar" => "baz",
            "attributes" => [
                "one" => 1,
                "two" => "deux",
            ]
        ];
        $row = $expected;
        $row["attributes"] = json_encode($row["attributes"]);
        return [
            [Operation::TYPE_SELECT, $row, $expected],
        ];
    }

    /**
     * Generate data for testing packing as JSON for write operations.
     *
     * @return array
     */
    public function provideWriteOperations() {
        $set = [
            "foo" => "bar",
            "bar" => "baz",
            "attributes" => [
                "one" => 1,
                "two" => "deux",
            ]
        ];
        $expected = $set;
        $expected["attributes"] = json_encode($expected["attributes"]);
        return [
            [Operation::TYPE_INSERT, $set, $expected],
            [Operation::TYPE_UPDATE, $set, $expected],
        ];
    }

    /**
     * Verify processor packs fields for write operations.
     *
     * @param string $type
     * @param array $set
     * @param array $expected
     * @dataProvider provideWriteOperations
     */
    public function testPackFields(string $type, array $set, array $expected) {
        $model = new BasicPipelineModel("Example");
        $processor = new JsonFieldProcessor();
        $processor->setFields(["attributes"]);
        $model->addPipelineProcessor($processor);

        $operation = new Operation();
        $operation->setType($type);
        $operation->setCaller($model);
        $operation->setSet($set);
        $model->doOperation($operation);
        $this->assertEquals($expected, $operation->getSet());
    }

    /**
     * Verify processor unpacks fields for read operations.
     *
     * @param string $type
     * @param array $row
     * @param array $expected
     * @dataProvider provideReadOperations
     */
    public function testUnpackFields(string $type, array $row, array $expected) {
        $model = new BasicPipelineModel("Example");
        $processor = new JsonFieldProcessor();
        $processor->setFields(["attributes"]);
        $model->addPipelineProcessor($processor);

        $operation = new Operation();
        $operation->setType($type);
        $operation->setCaller($model);
        $result = $model->doSelectOperation($operation, [$row]);
        $this->assertEquals([$expected], $result);
    }
}
