import { convexQuery } from "@convex-dev/react-query";
import { api } from "@fenchem-lp/backend/convex/_generated/api";
import type { Doc, Id } from "@fenchem-lp/backend/convex/_generated/dataModel";
import { Button } from "@fenchem-lp/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@fenchem-lp/ui/components/card";
import { Checkbox } from "@fenchem-lp/ui/components/checkbox";
import { Input } from "@fenchem-lp/ui/components/input";
import { colors, radii } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";

const styles = stylex.create({
  container: {
    marginInline: "auto",
    width: "100%",
    maxWidth: "28rem",
    paddingBlock: "2.5rem",
  },
  form: {
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  empty: {
    paddingBlock: "1rem",
    textAlign: "center",
    color: colors.mutedForeground,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    padding: "0.5rem",
  },
  itemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: colors.foreground,
    cursor: "pointer",
  },
  labelCompleted: {
    color: colors.mutedForeground,
    textDecoration: "line-through",
  },
  trashIcon: {
    height: "1rem",
    width: "1rem",
  },
});

export const Route = createFileRoute("/todos")({
  component: TodosRoute,
});

function TodosRoute() {
  const [newTodoText, setNewTodoText] = useState("");

  const { data: todos } = useQuery(convexQuery(api.todos.getAll, {}));

  const createTodo = useMutation(api.todos.create);
  const toggleTodo = useMutation(api.todos.toggle);
  const removeTodo = useMutation(api.todos.deleteTodo);

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newTodoText.trim();
    if (text) {
      setNewTodoText("");
      try {
        await createTodo({ text });
      } catch (error) {
        console.error("Failed to add todo:", error);
        setNewTodoText(text);
      }
    }
  };

  const handleToggleTodo = async (id: Id<"todos">, completed: boolean) => {
    try {
      await toggleTodo({ id, completed: !completed });
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      await removeTodo({ id });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div {...stylex.props(styles.container)}>
      <Card>
        <CardHeader>
          <CardTitle>Todo List (Convex)</CardTitle>
          <CardDescription>Manage your tasks efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTodo} {...stylex.props(styles.form)}>
            <Input
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Add a new task..."
            />
            <Button type="submit" disabled={!newTodoText.trim()}>
              Add
            </Button>
          </form>

          {!todos || todos.length === 0 ? (
            <p {...stylex.props(styles.empty)}>No todos yet. Add one above!</p>
          ) : (
            <ul {...stylex.props(styles.list)}>
              {todos.map((todo: Doc<"todos">) => (
                <li key={todo._id} {...stylex.props(styles.item)}>
                  <div {...stylex.props(styles.itemLeft)}>
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleTodo(todo._id, todo.completed)}
                      id={`todo-${todo._id}`}
                    />
                    <label
                      htmlFor={`todo-${todo._id}`}
                      {...stylex.props(styles.label, todo.completed && styles.labelCompleted)}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTodo(todo._id)}
                    aria-label="Delete todo"
                  >
                    <Trash2 {...stylex.props(styles.trashIcon)} />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
